const AccessRequest = require('../models/AccessRequest');

exports.createAccessRequest = async (req, res, next) => {
    try {
        const { user_email, user_name, contact_number, purpose, product_file_id } = req.body;
        
        const accessRequest = new AccessRequest({
            user_email,
            user_name,
            contact_number,
            purpose,
            product_file_id
        });
        
        await accessRequest.save();
        
        res.status(201).json({
            success: true,
            message: 'Access request submitted successfully',
            requestId: accessRequest._id
        });
    } catch (error) {
        next(error);
    }
};

exports.getPendingRequests = async (req, res, next) => {
    try {
        const pendingRequests = await AccessRequest.find({ status: 'pending' })
            .populate({
                path: 'product_file_id',
                populate: [
                    { path: 'product_id', select: 'name' },
                    { path: 'country_id', select: 'name' }
                ]
            })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: pendingRequests
        });
    } catch (error) {
        next(error);
    }
};

exports.approveRequest = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        
        const accessRequest = await AccessRequest.findByIdAndUpdate(
            requestId,
            { status: 'approved' },
            { new: true }
        );
        
        if (!accessRequest) {
            return res.status(404).json({
                success: false,
                message: 'Access request not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Request approved successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.rejectRequest = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        
        const accessRequest = await AccessRequest.findByIdAndUpdate(
            requestId,
            { status: 'rejected' },
            { new: true }
        );
        
        if (!accessRequest) {
            return res.status(404).json({
                success: false,
                message: 'Access request not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Request rejected successfully'
        });
    } catch (error) {
        next(error);
    }
};
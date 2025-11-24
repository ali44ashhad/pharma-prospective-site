// import React, { useState, useEffect } from 'react';
// import { adminService, productService } from '../../services';
// import { toast } from 'react-toastify';
// import { validateFile } from '../../utils/validators';
// import { FaUpload, FaFilePdf, FaTimes } from 'react-icons/fa';

// const ProductFileUpload = () => {
//   const [formData, setFormData] = useState({
//     product_id: '',
//     country_id: '',
//     pdfFile: null
//   });
//   const [products, setProducts] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [productsData, countriesData] = await Promise.all([
//         productService.getAllProducts(),
//         productService.getAllCountries()
//       ]);
//       setProducts(productsData);
//       setCountries(countriesData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('Failed to load products and countries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateFile(file);
//     if (!validation.isValid) {
//       toast.error(validation.errors[0]);
//       return;
//     }

//     setFormData(prev => ({
//       ...prev,
//       pdfFile: file
//     }));
//   };

//   const removeFile = () => {
//     setFormData(prev => ({
//       ...prev,
//       pdfFile: null
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.product_id || !formData.country_id || !formData.pdfFile) {
//       toast.error('Please fill all fields and select a PDF file');
//       return;
//     }

//     setUploading(true);

//     try {
//       const submitData = new FormData();
//       submitData.append('pdfFile', formData.pdfFile);
//       submitData.append('product_id', formData.product_id);
//       submitData.append('country_id', formData.country_id);

//       await adminService.uploadProductFile(submitData);
//       toast.success('Product file uploaded successfully!');
      
//       // Reset form
//       setFormData({
//         product_id: '',
//         country_id: '',
//         pdfFile: null
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload file');
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="card p-6">
//         <div className="flex items-center justify-center py-12">
//           <div className="w-8 h-8 border-t-2 border-primary-600 rounded-full animate-spin"></div>
//           <span className="ml-3 text-gray-600">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="card p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Upload Product File</h2>
//         <p className="text-gray-600">
//           Upload PDF documents for specific product-country combinations
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Product Selection */}
//         <div>
//           <label htmlFor="product_id" className="form-label">
//             Product
//           </label>
//           <select
//             id="product_id"
//             name="product_id"
//             value={formData.product_id}
//             onChange={handleInputChange}
//             className="form-input"
//             required
//           >
//             <option value="">Select a product</option>
//             {products.map((product) => (
//               <option key={product._id} value={product._id}>
//                 {product.name.split('_').map(word => 
//                   word.charAt(0).toUpperCase() + word.slice(1)
//                 ).join(' ')}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Country Selection */}
//         <div>
//           <label htmlFor="country_id" className="form-label">
//             Country
//           </label>
//           <select
//             id="country_id"
//             name="country_id"
//             value={formData.country_id}
//             onChange={handleInputChange}
//             className="form-input"
//             required
//           >
//             <option value="">Select a country</option>
//             {countries.map((country) => (
//               <option key={country._id} value={country._id}>
//                 {country.name} ({country.code})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* File Upload */}
//         <div>
//           <label htmlFor="pdfFile" className="form-label">
//             PDF File
//           </label>
          
//           {!formData.pdfFile ? (
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//               <div className="space-y-1 text-center">
//                 <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     htmlFor="pdfFile"
//                     className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
//                   >
//                     <span>Upload a PDF file</span>
//                     <input
//                       id="pdfFile"
//                       name="pdfFile"
//                       type="file"
//                       accept=".pdf"
//                       onChange={handleFileChange}
//                       className="sr-only"
//                       required
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500">PDF up to 10MB</p>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-1 flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50">
//               <div className="flex items-center space-x-3">
//                 <FaFilePdf className="w-8 h-8 text-red-500" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">
//                     {formData.pdfFile.name}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={removeFile}
//                 className="text-gray-400 hover:text-gray-500"
//               >
//                 <FaTimes className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={uploading}
//           className="w-full btn btn-primary py-3 flex items-center justify-center space-x-2"
//         >
//           {uploading ? (
//             <div className="flex items-center">
//               <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
//               Uploading...
//             </div>
//           ) : (
//             <>
//               <FaUpload className="w-4 h-4" />
//               <span>Upload Product File</span>
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductFileUpload;

import React, { useState, useEffect } from 'react';
import { adminService, productService } from '../../services';
import { toast } from 'react-toastify';
import { validateFile } from '../../utils/validators';
import { FaUpload, FaFilePdf, FaTimes } from 'react-icons/fa';

const ProductFileUpload = () => {
  const [formData, setFormData] = useState({
    product_id: '',
    country_id: '',
    pdfFile: null
  });
  const [products, setProducts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, countriesData] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllCountries()
      ]);
      setProducts(productsData);
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load products and countries');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.isValid) {
      toast.error(validation.errors[0]);
      return;
    }

    setFormData(prev => ({
      ...prev,
      pdfFile: file
    }));
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      pdfFile: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.product_id || !formData.country_id || !formData.pdfFile) {
      toast.error('Please fill all fields and select a PDF file');
      return;
    }

    setUploading(true);

    try {
      const submitData = new FormData();
      submitData.append('pdfFile', formData.pdfFile);
      submitData.append('product_id', formData.product_id);
      submitData.append('country_id', formData.country_id);

      await adminService.uploadProductFile(submitData);
      toast.success('Product file uploaded successfully!');
      
      // Reset form
      setFormData({
        product_id: '',
        country_id: '',
        pdfFile: null
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white/5 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
          <span className="ml-3 text-cyan-200">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Upload Product File</h2>
        <p className="text-cyan-200">
          Upload PDF documents for specific product-country combinations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <div>
          <label htmlFor="product_id" className="block text-sm font-medium text-cyan-100 mb-2">
            Product
          </label>
          <select
            id="product_id"
            name="product_id"
            value={formData.product_id}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-white/8 bg-white/3 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            <option value="" className="text-gray-900">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id} className="text-gray-900">
                {product.name.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Country Selection */}
        <div>
          <label htmlFor="country_id" className="block text-sm font-medium text-cyan-100 mb-2">
            Country
          </label>
          <select
            id="country_id"
            name="country_id"
            value={formData.country_id}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-white/8 bg-white/3 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            <option value="" className="text-gray-900">Select a country</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id} className="text-gray-900">
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="pdfFile" className="block text-sm font-medium text-cyan-100 mb-2">
            PDF File
          </label>
          
          {!formData.pdfFile ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/8 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-cyan-300" />
                <div className="flex text-sm text-cyan-200 justify-center">
                  <label
                    htmlFor="pdfFile"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-cyan-700 hover:text-cyan-600 px-3 py-1"
                  >
                    <span>Upload a PDF file</span>
                    <input
                      id="pdfFile"
                      name="pdfFile"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="sr-only"
                      required
                    />
                  </label>
                  <p className="pl-1 text-cyan-200">or drag and drop</p>
                </div>
                <p className="text-xs text-cyan-300">PDF up to 10MB</p>
              </div>
            </div>
          ) : (
            <div className="mt-1 flex items-center justify-between p-4 border border-white/8 rounded-lg bg-white/3">
              <div className="flex items-center space-x-3">
                <FaFilePdf className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {formData.pdfFile.name}
                  </p>
                  <p className="text-sm text-cyan-200">
                    {(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-cyan-200 hover:text-white"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center justify-center space-x-2"
        >
          {uploading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Uploading...
            </div>
          ) : (
            <>
              <FaUpload className="w-4 h-4" />
              <span>Upload Product File</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductFileUpload;

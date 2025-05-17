
'use client';

// pages/add-news-json.js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function AddNewsJson() {
  const router = useRouter();
  const [jsonData, setJsonData] = useState('');
  const [titleImage, setTitleImage] = useState(null);
  const [detailImages, setDetailImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleJsonChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleTitleImageChange = (e) => {
    if (e.target.files[0]) {
      setTitleImage(e.target.files[0]);
    }
  };

  const handleDetailImagesChange = (e) => {
    if (e.target.files) {
      setDetailImages(Array.from(e.target.files));
    }
  };

  const validateJsonData = (data) => {
    try {
      const parsed = JSON.parse(data);
      
      // Check if it's an array
      if (!Array.isArray(parsed)) {
        return { valid: false, message: 'JSON data must be an array of news objects' };
      }
      
      // Check if array has items
      if (parsed.length === 0) {
        return { valid: false, message: 'JSON data contains no news items' };
      }

      // Check if each item has required fields
      for (let i = 0; i < parsed.length; i++) {
        const news = parsed[i];
        if (!news.title) {
          return { valid: false, message: `News item at index ${i} is missing a title` };
        }
      }
      
      return { valid: true, data: parsed };
    } catch (e) {
      return { valid: false, message: 'Invalid JSON format: ' + e.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate JSON
    const validationResult = validateJsonData(jsonData);
    if (!validationResult.valid) {
      setError(validationResult.message);
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData for the file uploads
      const formData = new FormData();
      formData.append('news_data', jsonData);
      
      if (titleImage) {
        formData.append('title_image', titleImage);
      }
      
      if (detailImages.length > 0) {
        detailImages.forEach((image, index) => {
          formData.append(`detail_images[${index}]`, image);
        });
      }

      // Here you would make an API call to your Django backend
      // For demonstration purposes, we'll simulate a successful upload
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(`Successfully uploaded ${validationResult.data.length} news items!`);
      // Optionally redirect to news listing page
      // setTimeout(() => router.push('/news-listing'), 2000);
      
    } catch (error) {
      setError('Error uploading news: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Head>
        <title>Add News via JSON</title>
        <meta name="description" content="Add news items by JSON format" />
      </Head>

      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Add News via JSON</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="jsonData" className="block text-sm font-medium text-gray-700 mb-2">
                News Data (JSON format)
              </label>
              <textarea
                id="jsonData"
                rows="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='[{"title": "News Title", "headline": "News Headline", "text": "News content...", "location": "City, Country", "date": "2025-05-17", "categories": ["Politics", "International"], "source": ["Reuters"], "tags": ["breaking", "politics"], "featured": false}]'
                value={jsonData}
                onChange={handleJsonChange}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Paste JSON array containing multiple news objects
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="titleImage" className="block text-sm font-medium text-gray-700 mb-2">
                Title Image
              </label>
              <input
                type="file"
                id="titleImage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
                onChange={handleTitleImageChange}
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload the main image for these news items
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="detailImages" className="block text-sm font-medium text-gray-700 mb-2">
                Detail Images
              </label>
              <input
                type="file"
                id="detailImages"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
                multiple
                onChange={handleDetailImagesChange}
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload multiple detail images (optional)
              </p>
              {detailImages.length > 0 && (
                <p className="mt-2 text-sm text-blue-600">
                  {detailImages.length} image(s) selected
                </p>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload News'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
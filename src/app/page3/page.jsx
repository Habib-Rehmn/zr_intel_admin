
'use client';

// pages/news-listing.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function NewsListing() {
  const router = useRouter();
  const [newsItems, setNewsItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call to fetch news from your Django backend
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual fetch from your Django API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Sample news data
      const mockNewsData = [
        {
          id: 1,
          title: "Global Climate Summit Concludes with New Agreements",
          headline: "World leaders reach consensus on emissions targets",
          location: "Geneva, Switzerland",
          date: "2025-05-15",
          categories: ["Politics", "Environment"],
          status: "approved",
          featured: true,
          read_time: "4 minutes"
        },
        {
          id: 2,
          title: "Tech Company Launches Revolutionary AI Assistant",
          headline: "New AI system promises to transform productivity",
          location: "San Francisco, USA",
          date: "2025-05-16",
          categories: ["Technology", "Business"],
          status: "approved",
          featured: false,
          read_time: "3 minutes"
        },
        {
          id: 3,
          title: "Major Breakthrough in Renewable Energy Storage",
          headline: "Scientists develop high-capacity battery technology",
          location: "Berlin, Germany",
          date: "2025-05-14",
          categories: ["Science", "Technology"],
          status: "pending",
          featured: false,
          read_time: "5 minutes"
        },
        {
          id: 4,
          title: "International Sports Tournament Opens with Spectacular Ceremony",
          headline: "Thousands gather for opening of global sports event",
          location: "Tokyo, Japan",
          date: "2025-05-17",
          categories: ["Sports", "Entertainment"],
          status: "approved",
          featured: true,
          read_time: "2 minutes"
        },
        {
          id: 5,
          title: "Economic Forum Predicts Growth in Emerging Markets",
          headline: "Analysts forecast positive trends for developing economies",
          location: "Singapore",
          date: "2025-05-13",
          categories: ["Business", "Economy"],
          status: "approved",
          featured: false,
          read_time: "6 minutes"
        }
      ];
      
      setNewsItems(mockNewsData);
    } catch (error) {
      console.error("Error fetching news items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(itemId => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === newsItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(newsItems.map(item => item.id));
    }
  };

  const handleGenerateSelected = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one news item');
      return;
    }

    setIsGenerating(true);
    
    try {
      // In a real application, you would send the selected IDs to your backend
      // and process the generation request
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Successfully processed ${selectedItems.length} news items!`);
      
      // Clear the selection after successful generation
      setSelectedItems([]);
    } catch (error) {
      console.error("Error generating content:", error);
      alert('Error generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const navigateToAddNews = () => {
    router.push('/add-news-json');
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      'Politics': 'bg-blue-100 text-blue-800',
      'Environment': 'bg-green-100 text-green-800',
      'Technology': 'bg-purple-100 text-purple-800',
      'Business': 'bg-yellow-100 text-yellow-800',
      'Science': 'bg-indigo-100 text-indigo-800',
      'Sports': 'bg-red-100 text-red-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Economy': 'bg-orange-100 text-orange-800'
    };
    
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'approved': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Head>
        <title>News Listing</title>
        <meta name="description" content="View and manage news items" />
      </Head>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">News Listing</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleGenerateSelected}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={selectedItems.length === 0 || isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Selected'}
            </button>
            <button
              onClick={navigateToAddNews}
              className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add News Items
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <div className="flex items-center pr-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedItems.length === newsItems.length && newsItems.length > 0}
                      onChange={handleSelectAll}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {selectedItems.length === 0 
                        ? 'Select All' 
                        : `Selected ${selectedItems.length} of ${newsItems.length}`}
                    </span>
                  </div>
                </div>
              </div>

              {newsItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No news items found. Add some news to get started.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {newsItems.map((item) => (
                    <li key={item.id} className="hover:bg-blue-50">
                      <div className="flex px-6 py-5">
                        <div className="pr-4 flex items-start">
                          <input
                            type="checkbox"
                            className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <div className="flex items-center space-x-2">
                              {item.featured && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  Featured
                                </span>
                              )}
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.headline}</p>
                          <div className="flex flex-wrap items-center text-xs text-gray-500 mb-2">
                            <span className="mr-3">{new Date(item.date).toLocaleDateString()}</span>
                            <span className="mr-3">{item.location}</span>
                            <span>{item.read_time}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.categories.map((category, index) => (
                              <span 
                                key={index} 
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(category)}`}
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
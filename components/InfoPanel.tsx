'use client';

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-[1999]"
        onClick={onClose}
      />
      
      <div className="absolute top-12 right-4 z-[2001] bg-white rounded-lg shadow-xl border border-gray-200 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">About This Project</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close info"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">How to Use the Map</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong>Navigate the Map:</strong> Click and drag to pan, use the zoom controls or 
                mouse wheel to zoom in and out.
              </li>
              <li>
                <strong>View Locations:</strong> When zoomed out (zoom level &lt; 11), you&apos;ll see 
                location markers showing collection sites. Click a location marker to zoom in and 
                view individual jars.
              </li>
              <li>
                <strong>View Jar Details:</strong> When zoomed in (zoom level ≥ 11), click on a 
                jar marker to see detailed information in the side panel, including crayfish counts, 
                infection data, and collection information.
              </li>
              <li>
                <strong>Navigate Between Jars:</strong> When viewing jars at a location, use the 
                previous/next buttons in the top bar to navigate between jars at that location.
              </li>
              <li>
                <strong>Filter Data:</strong> Use the filter button to filter by season (Spring, 
                Summer, Fall, Winter) or infection types (BD, mc(L), mc(s), acanth).
              </li>
              <li>
                <strong>Reset View:</strong> Click the globe icon to return to the default map view 
                showing all locations.
              </li>
              <li>
                <strong>Go Back:</strong> Use the back arrow to return to the previous view level.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

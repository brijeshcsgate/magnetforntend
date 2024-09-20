import { icons } from "./index";

const IconDocumentation = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">SVG Icon Library Documentation</h1>
    {Object.entries(icons).map(([category, iconsInCategory]) => (
      <div key={category} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {category.charAt(0).toUpperCase() + category.slice(1)} Icons
        </h2>
        {Object.entries(iconsInCategory).map(([iconName, IconComponent]) => (
          <div key={iconName} className="mb-6 p-4 border rounded-lg">
            <h3 className="text-xl font-medium mb-2">{iconName}</h3>
            <div className="flex items-center space-x-4 mb-4">
              <IconComponent className="size-6" />
              <span className="text-gray-600 sr-only">{iconName}</span>
            </div>
            <div className="mb-4">
              <h4 className="font-medium">Usage</h4>
              <pre className="bg-gray-100 p-4 rounded">
                <code>{`<${iconName} className="size-6" />`}</code>
              </pre>
            </div>
            <div>
              <h4 className="font-medium">Import</h4>
              <pre className="bg-gray-100 p-4 rounded">
                <code>{`import { ${iconName} } from '@/components/icons';`}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default IconDocumentation;

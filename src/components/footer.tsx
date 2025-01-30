import { contentfulQueries } from '@/lib/contentful/queries';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

export default async function Footer() {
  const footer = await contentfulQueries.getFooter();

  return (
    <footer className="bg-burgundy-900 text-white p-8 mt-12">
      <div className="container mx-auto">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{footer.title}</h3>
          <div className="text-sm">
            {documentToReactComponents(footer.content)}
          </div>
        </div>
        <div className="text-sm mt-4">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

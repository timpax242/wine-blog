import Image from 'next/image';

// Interface defining required props for the AuthorProfile component
interface AuthorProfileProps {
  name: string;
  bio: string;
  image: string;
}

// Component to display author information at the end of blog posts
export function AuthorProfile({ name, bio, image }: AuthorProfileProps) {
  return (
    <div className="flex items-center space-x-4 mt-12 p-6 bg-white rounded-md shadow-sm">
      {/* Author avatar */}
      <div className="flex-shrink-0">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>

      {/* Author details */}
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600 mt-1">{bio}</p>
      </div>
    </div>
  );
}

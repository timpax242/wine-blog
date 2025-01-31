import Image from 'next/image';

interface AuthorProfileProps {
  name: string;
  bio: string;
  image: string;
}

export function AuthorProfile({ name, bio, image }: AuthorProfileProps) {
  return (
    <div className="flex items-center space-x-4 mt-12 p-6 bg-white rounded-md shadow-sm">
      <div className="flex-shrink-0">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600 mt-1">{bio}</p>
      </div>
    </div>
  );
}

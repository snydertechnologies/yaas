import gravatar from 'gravatar-url';

interface AvatarOptions {
  size?: number;
  defaultImage?: string;
}

export function getAvatar(email: string, options: AvatarOptions = {}): string {
  // Default options for Gravatar URL
  const defaultOptions: AvatarOptions = {
    size: 200, // Default size is 200px
    defaultImage: 'identicon', // Default image if no Gravatar is found
    ...options, // Override default options if provided
  };

  // Generate Gravatar URL
  const avatarUrl: string = gravatar(email, defaultOptions);

  return avatarUrl;
}

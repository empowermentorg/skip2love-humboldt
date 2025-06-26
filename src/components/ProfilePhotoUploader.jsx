import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ProfilePhotoUploader() {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    const user = (await supabase.auth.getUser()).data.user;
    const filePath = `avatars/${user.id}-${Date.now()}.${file.name.split('.').pop()}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      setMessage('Error uploading file.');
      setUploading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: filePath })
      .eq('id', user.id);

    if (updateError) {
      setMessage('Error updating profile.');
    } else {
      setAvatarUrl(filePath);
      setMessage('Upload successful!');
    }

    setUploading(false);
  };

  const getPublicUrl = (path) => {
    const { data } = supabase.storage.from('profile-photos').getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <div className="p-4 rounded border max-w-sm">
      <label className="block mb-2 text-sm font-medium">Upload Profile Photo:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="mb-3"
      />
      {uploading && <p>Uploading...</p>}
      {avatarUrl && (
        <img
          src={getPublicUrl(avatarUrl)}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
      )}
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}

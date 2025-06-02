'use client';

import { useState } from 'react';

export default function CSVUpload({ onSuccess }: { onSuccess?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('⚠️ Vui lòng chọn file CSV');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/products/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Import thất bại');
      }

      const result = await response.json();
      setMessage(`✅ Đã import ${result.inserted} sản phẩm`);

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setMessage(`❌ Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <h3>📥 Import sản phẩm từ CSV</h3>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={loading}
      />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? 'Đang upload...' : 'Import CSV'}
      </button>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

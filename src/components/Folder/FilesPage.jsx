import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import file1 from './CountriesApp.zip';
import file2 from './android.pdf';
import file3 from './CarPicker.zip';
import file4 from './June24.zip';
import file5 from './June25.zip';

const FILES = [
  { path: file1, name: 'CountriesApp.zip' },
  { path: file2, name: 'android.pdf' },
  {path: file3, name: 'CarPicker.zip' },
  {path: file4, name: 'June24.zip' },
  {path: file5, name: 'June25.zip' },
];

function FilesPage() {
  const location = useLocation();
  const hasDownloaded = useRef(false); // 👈 guard

  useEffect(() => {
    if (location.pathname === '/files' && !hasDownloaded.current) {
      hasDownloaded.current = true; // 👈 flip before calling
      downloadAsZip();
    }
  }, [location.pathname]);

  const downloadAsZip = async () => {
    const zip = new JSZip();

    await Promise.all(
      FILES.map(async ({ path, name }) => {
        const res = await fetch(path);
        const blob = await res.blob();
        zip.file(name, blob);
      })
    );

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'files.zip');
  };

  return <div>Preparing download...</div>;
}

export default FilesPage;
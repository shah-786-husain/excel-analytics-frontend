import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../features/fileSlice";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpload = () => {
    if (file && user) {
      dispatch(uploadFile({ file, token: user.token }));
      setFile(null);
    }
  };

  return (
    <div className="mb-6">
      <input
        className="border p-2 rounded"
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="ml-2 bg-green-600 text-white px-4 py-1 rounded"
      >
        Upload
      </button>
    </div>
  );
}

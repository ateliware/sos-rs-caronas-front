import * as XLSX from 'xlsx';

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function fileToBlobURL(file: File): string {
  return URL.createObjectURL(new Blob([file]));
}

export function objectToFormData(object: { [key: string]: any }) {
  const formData = new FormData();
  for (const key of Object.keys(object)) {
    if (Array.isArray(object[key])) {
      for (const item of object[key]) {
        formData.append(key, item);
      }
    } else {
      formData.append(key, object[key]);
    }
  }

  return formData;
}

export function convertXlsToJSON(file: File) {
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(jsonData);
  };

  reader.readAsArrayBuffer(new Blob([file]));
}

export function convertJsonToXls(data: object[], filename: string) {
  if (!data.length) return null;

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
}

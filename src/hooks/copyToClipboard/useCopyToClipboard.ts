// import copy from "copy-to-clipboard";
// import { useState } from "react";
// interface CopyOptions {
//   format?: string;
//   onCopy?: () => void;
// }

// const useCopyToClipboard = () => {
//   const [value, setValue] = useState<string>();
//   const [success, setSuccess] = useState<boolean>();
//   const copyToClipboard = (text: string, options?: CopyOptions) => {
//     const result = copy(text, options);
//     if (result) {
//       setValue(text);
//     }
//     setSuccess(result);
//   };
//   return [copyToClipboard, { value, success }];
// };

// export default useCopyToClipboard;
import { useState } from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy]
}

export default useCopyToClipboard
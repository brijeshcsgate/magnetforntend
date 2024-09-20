export default function extractAndConcatenateEnglishNames(obj){
    let result = '';

       // Calculate the length of the current object
      //  let objLength = Object.keys(obj).length;
      //  console.log(`Object length: ${objLength}`);
    if (obj?.name && obj?.name.english) {
      result += obj.name.english + ' ,  ';
    }
  
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        
        if (Array.isArray(obj[key])) {
          obj[key].forEach(item => {
            result += extractAndConcatenateEnglishNames(item);
          });
        } else {
          result += extractAndConcatenateEnglishNames(obj[key]);
        }
      }
    }
    // let str = result;
    // let updatedStr = str.replace(/,\s*$/, '');
    
    return result;
  };
  
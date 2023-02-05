import { readdir } from 'fs/promises';

export const getFileList = async (dirName) => {
    try {
        const files = await readdir(dirName);
        const updateArray = files.map((item, index) =>  {
            return {id: index, text: item}
        })
        return updateArray;    
    } catch (error) {
        return []
    }
};

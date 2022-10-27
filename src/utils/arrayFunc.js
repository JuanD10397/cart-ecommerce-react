// Función que cuenta cantidad de duplicados que hay en un Array
export const countDuplicatesItemArray = (value, array) => {
    let count = 0;
    array.forEach((arrayValue) => {
        if(arrayValue == value){
            count++;
        }
    });
    return count;
};


// Remueve duplicados del array
export const removeArrayDuplicates = (array) => {
    //automáticamente pasa el array sin duplicados
    return Array.from(new Set(array));
}


// Elimina elemento del array
export const removeItemArray = (array, item) => {
    const index = array.indexOf(item);

    if(index > -1){
        array.splice(index, 1);
    }
    return array;
}
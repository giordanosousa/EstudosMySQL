const { format, isValid, parse } = require('date-fns');

/**
 * Parse a data no formato brasileiro (dd/MM/yyyy) e a formata para o formato de armazenamento (yyyy-MM-dd)
 * @param {string} dateStr - Data no formato dd/MM/yyyy
 * @returns {string} - Data formatada no formato yyyy-MM-dd
 */
function parseAndFormatDate(dateStr) {
    // Parse a data no formato brasileiro (dd/MM/yyyy)
    const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date());
    
    // Verifique se a data é válida
    if (!isValid(parsedDate)) {
        throw new Error('Data de nascimento inválida');
    }
    
    // Formate a data para o formato correto para armazenamento (yyyy-MM-dd)
    return format(parsedDate, 'yyyy-MM-dd');
}

module.exports = {
    parseAndFormatDate
};

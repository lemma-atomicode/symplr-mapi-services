var SymplrError = require('../../../symplr-commons/src/symplr-error');
var createAccount = async function(account){
    console.info('Creating account');    
    console.debug('Checking if account with name (%s) already exists', account.name);
    var existingAccount = await this.accountDAO.getAccountByName(account.name);
    if(existingAccount){
        var message = 'Account name already exists';
        console.debug(message);
        throw new SymplrError(message, SymplrError.CONFLICT);
    }
    console.info('Account name is available');
    var insertedId = await this.accountDAO.saveAccount(account);
    console.trace('Generated id: ' + insertedId);
    return insertedId;    
};

let AccountService = function(accountDAO){
    this.accountDAO = accountDAO;
    this.createAccount = createAccount;
};

module.exports.AccountService = AccountService;
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
should = chai.should();
expect = chai.expect;

var MongoClient = require('mongodb').MongoClient;
var AccountDAO = require('../../symplr-mapi-daos/src/account-dao').AccountDAO;
var AccountService = require('../src/account-service').AccountService;
describe('AccountService', function(){
    let accountService;
    before(async function(){
        console.log('Preparing connection');
        var client = await MongoClient.connect('mongodb+srv://admin:admin@symplr-dev-f5ldu.mongodb.net/test');
        var db = client.db('symplr');
        var accounts = await db.collection('accounts');
        await accounts.deleteOne({name: 'MedioMelonUnexisting'});

        var accountDao = new AccountDAO(client);       
        accountService = new AccountService(accountDao);
    });

    describe('#createAccount()', function(){
        it('should throw an exception', async () => {
            var existingAccount = {name: 'AtomiCodeDemos'};
            return accountService.createAccount(existingAccount).should.eventually.be.rejected;
        })

        it('should return a string', async () => {
            var unexistingAccount = {
                name: 'MedioMelonUnexisting'
            };
            return accountService.createAccount(unexistingAccount).should.eventually.not.empty;
        });
    });
});
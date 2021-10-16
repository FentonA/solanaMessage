const anchor = require('@project-serum/anchor');
const assert = require('@project-serum/anchor');
const {SystemProgram} = anchor.web3;

describe('messageApp', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.MessageApp;
  it("It initializes the account", async() =>{
    const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize("Hello World", {
      accounts:{
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);
    assert.ok(account.data === 'Hello World');
    _baseAccount = baseAccount;
  });

  it("Update a previously created account", async() =>{
    const baseAccount = _baseAccount;

    await program.rpc.update("Some new data", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Updated data: ', account.data);
    assert.ok(account.data === "Some new data");
    console.log('all account data: ', account);
    assert.ok(account.detaList.length === 2);
  });
});

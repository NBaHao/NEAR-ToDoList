export class Contract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;    
  }

  async get({offset, limit}) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get', args: { offset: offset, limit: limit } });
  }

  async create({task}) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'create', args: { task: task } });
  }

  async del({id}) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'del', args: {id: id} });
  }

  async update({ id, updates }) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'update', args: {id: id, updates: updates} });
  }

}
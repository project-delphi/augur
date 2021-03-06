import React from 'react';
import Transactions from 'modules/transactions/components/transactions';
import Branch from 'modules/branch/components/branch';

const TransactionsPage = p => (
  <section id="transactions_view">
    {!!p.loginAccount.rep && !!p.loginAccount.rep.value && !!p.branch.id &&
      <Branch {...p.branch} />
    }

    <div className="view-header">
      <h2>Transactions</h2>
    </div>

    <div className="page-content">
      <Transactions
        className="transactions-content"
        transactions={p.transactions}
        currentBlockNumber={p.currentBlockNumber}
      />
    </div>
  </section>
);

TransactionsPage.propTypes = {
  branch: React.PropTypes.object,
  className: React.PropTypes.string,
  loginAccount: React.PropTypes.object,
  transactions: React.PropTypes.array,
  currentBlockNumber: React.PropTypes.number
};

export default TransactionsPage;

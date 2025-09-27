import 'package:flutter/material.dart';
import 'package:personal_finance/widgets/balance_card.dart';
import 'package:personal_finance/widgets/transaction_list.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:personal_finance/blocs/income_expense/income_expense_bloc.dart';
import 'package:personal_finance/blocs/income_expense/income_expense_state.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: theme.appBarTheme.foregroundColor,
      appBar: AppBar(
        title: const Text(
          'Wallet',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            BlocBuilder<IncomeExpenseBloc, IncomeExpenseState>(
              builder: (context, state) {
                if (state is TransactionLoading) {
                  return const BalanceCard(
                    title: 'Available Balance',
                    amount: '\$0',
                    subtitle: 'See details',
                  );
                } else if (state is TransactionLoaded) {
                  final balance = state.transactions.fold<double>(
                    0,
                    (sum, transaction) =>
                        transaction.type == 'income'
                            ? sum + transaction.amount
                            : sum - transaction.amount,
                  );

                  return BalanceCard(
                    title: 'Available Balance',
                    amount: '\$${balance.toString()}',
                    subtitle: 'See details',
                  );
                } else if (state is TransactionError) {
                  return const BalanceCard(
                    title: 'Available Balance',
                    amount: '\$0',
                    subtitle: 'See details',
                  );
                } else {
                  return const BalanceCard(
                    title: 'Available Balance',
                    amount: '\$0',
                    subtitle: 'See details',
                  );
                }
              },
            ),
            const SizedBox(height: 16),
            // Lista de transacciones recientes
            Text(
              'Recent Transactions',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            Expanded(
              child: BlocBuilder<IncomeExpenseBloc, IncomeExpenseState>(
                builder: (context, state) {
                  if (state is TransactionLoading) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (state is TransactionLoaded) {
                    return TransactionList(transactions: state.transactions);
                  } else if (state is TransactionError) {
                    return Center(child: Text(state.message));
                  } else {
                    return const Center(child: Text('No transactions found.'));
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

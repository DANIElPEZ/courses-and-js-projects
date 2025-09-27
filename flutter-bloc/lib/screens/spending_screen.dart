import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:personal_finance/widgets/line_chart_widget.dart';
import 'package:personal_finance/widgets/budget_card.dart';
import 'package:personal_finance/widgets/category_list.dart';
import 'package:personal_finance/blocs/income_expense/income_expense_bloc.dart';
import 'package:personal_finance/blocs/income_expense/income_expense_state.dart';
import 'package:personal_finance/widgets/line_chart_widget.dart';

class SpendingScreen extends StatelessWidget {
  const SpendingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: theme.appBarTheme.foregroundColor,
      appBar: AppBar(
        title: const Text(
          'My Spending',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(flex: 2, child: BlocBuilder(builder: (context, state){
              if (state is TransactionLoading) {
                return const Center(child: CircularProgressIndicator());
              } else if (state is TransactionLoaded) {
                final monthlyData = _calculateMonthlyData(state.transactions);
                return LineChartWidget(monthlyData: monthlyData);
              } else if (state is TransactionError) {
                return Center(
                  child: Text(state.message),
                );
              }else{
                return Center(
                  child: Text('No transactions found'),
                );
              }
            }
            )),
            SizedBox(height: 16),
            BudgetCard(
              title: "Budget for October",
              amount: "\$2,478",
              progress: 0.5,
            ),
            SizedBox(height: 16),
            Expanded(flex: 3, child: CategoryList()),
          ],
        ),
      ),
    );
  }

  List<FlSpot> _calculateMonthlyData(List transactions) {
    final monthlyTotals = List.generate(12, (index) => 0.0);

    for (var transaction in transactions) {
      if (transaction.type == 'expense') {
        final month = transaction.date.month - 1;
        monthlyTotals[month] += transaction.amount;
      }
    }

    return List.generate(
      12,
      (index) => FlSpot(index.toDouble(), monthlyTotals[index]),
    );
  }
}

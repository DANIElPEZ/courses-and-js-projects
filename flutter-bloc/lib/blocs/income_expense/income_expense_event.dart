import 'package:personal_finance/models/income_expense_model.dart';

abstract class IncomeExpenseEvent {}

class LoadTransactions extends IncomeExpenseEvent {}

class AddTransaction extends IncomeExpenseEvent {
  AddTransaction(this.transaction);

  final IncomeExpense transaction;
}

class DeleteTransaction extends IncomeExpenseEvent {
  DeleteTransaction(this.id);

  final String id;
}

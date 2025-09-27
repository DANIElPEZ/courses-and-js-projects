import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:personal_finance/models/income_expense_model.dart';

class IncomeExpenseRepository {
  IncomeExpenseRepository({FirebaseFirestore? firestore})
    : _firestore = firestore ?? FirebaseFirestore.instance;
  final FirebaseFirestore _firestore;

  Future<List<IncomeExpense>> fectchIncomeExpense() async {
    try {
      final querySnapshot = await _firestore.collection('transactions').get();
      return querySnapshot.docs
          .map(
            (doc) => IncomeExpense(
              id: doc.id,
              amount: doc['amount'],
              description: doc['description'],
              date: (doc['date'] as Timestamp).toDate(),
              type: doc['type'],
            ),
          )
          .toList();
    } catch (e) {
      throw Exception('Error fetching income expenses: $e');
    }
  }

  Future<void> addTransaction(IncomeExpense transaction) async {
    try {
      await _firestore.collection('transactions').add({
        "amount": transaction.amount,
        "description": transaction.description,
        "date": transaction.date,
        "type": transaction.type,
      });
    } catch (e) {
      throw Exception('Error adding transactions: $e');
    }
  }

  Future<void> deleteTransaction(String docId) async {
    await FirebaseFirestore.instance
        .collection('transactions')
        .doc(docId)
        .delete();
  }
}

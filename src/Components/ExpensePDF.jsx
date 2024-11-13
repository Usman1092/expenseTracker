import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
});

function ExpensePDF({ expenses, budget }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Expense Report</Text>
          <Text>Total Budget: ${budget}</Text>
        </View>
        <View style={styles.section}>
          {expenses.map((expense) => (
            <Text key={expense.id}>
              {expense.description} - ${expense.amount.toFixed(2)} ({expense.category})
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ExpensePDF;

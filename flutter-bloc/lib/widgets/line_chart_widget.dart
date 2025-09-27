import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class LineChartWidget extends StatelessWidget {
  const LineChartWidget({required this.monthlyData, super.key});
  final List<FlSpot> monthlyData;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return LineChart(
      LineChartData(
        // Configuración de la línea principal
        lineBarsData: [
          LineChartBarData(
            spots: monthlyData,
            isCurved: true,
            color: theme.primaryColor,
            barWidth: 3,
            dotData: const FlDotData(
              show: true,
            ),
            belowBarData: BarAreaData(
              show: true,
              color: theme.primaryColor.withOpacity(0.1),
            ),
          ),
        ],

        // Configuración de los títulos
        titlesData: FlTitlesData(
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 40,
              getTitlesWidget: (value, meta) {
                  return Text(
                    '\$${value.toInt()}k',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: Colors.grey.shade500,
                    ),
                  );
              },
            ),
          ),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 32,
              getTitlesWidget: (value, meta) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return Text(
                  months[value.toInt()],
                  style: const TextStyle(fontSize: 12),
                );
              },
            ),
          ),
        ),

        // Configuración de las líneas de cuadrícula
        gridData: FlGridData(
          show: true,
          drawHorizontalLine: true,
          getDrawingHorizontalLine: (value) {
            return FlLine(
              color: theme.primaryColorLight.withOpacity(0.3),
              strokeWidth: 1,
            );
          },
        ),

        // Configuración del borde
        borderData: FlBorderData(
          show: true,
          border: Border.all(
            color: theme.primaryColorLight.withOpacity(0.5),
          ),
        ),

        // Espaciado entre los puntos
        minX: 0,
        maxX: 11,
        minY: 0,
        maxY: monthlyData.map((e) => e.y).reduce((a, b) => a > b ? a : b)
      ),
      duration: const Duration(milliseconds: 300), // Animación de transición
      curve: Curves.easeInOut, // Curva de animación
    );
  }
}
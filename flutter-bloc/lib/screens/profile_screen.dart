import 'package:flutter/material.dart';
import 'package:personal_finance/widgets/profile_option.dart';
import 'package:personal_finance/widgets/profile_card.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import 'package:personal_finance/blocs/auth/auth_bloc.dart';
import 'package:personal_finance/blocs/auth/auth_event.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final user = FirebaseAuth.instance.currentUser;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: theme.appBarTheme.foregroundColor,
      appBar: AppBar(title: const Text('Profile',
        style: TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ))),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            ProfileCard(
              name: 'John Doe',
              email: user?.email ?? '',
              avatarUrl: null,
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView(
                children: [
                  ProfileOption(
                    icon: Icons.security,
                    title: 'Security Settings',
                  ),
                  ProfileOption(
                    icon: Icons.notifications,
                    title: 'Notifications',
                  ),
                  ProfileOption(
                    icon: Icons.help_outline,
                    title: 'Help & Support',
                  ),
                  ProfileOption(
                    icon: Icons.logout,
                    title: 'Logout',
                    onTap: () async {
                      final confirmed = await _showLogoutConfirmationDialog(context);
                      if(confirmed){
                        context.read<AuthBloc>().add(AuthLogoutRequest());
                        context.go('/login');
                      }
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<bool> _showLogoutConfirmationDialog(BuildContext context) async {
    return await showDialog<bool>(
          context: context,
          builder:
              (context) => AlertDialog(
                title: const Text('Confirm Logout'),
                content: const Text('Are you sure you want to log out?'),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    child: const Text('Cancel'),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(true),
                    child: const Text('Logout'),
                  ),
                ],
              ),
        ) ??
        false;
  }
}

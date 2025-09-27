abstract class AuthEvent{} //clase necesaria para hacer el posible el manejo del (on<EventType>())

class AuthEmailChanged extends AuthEvent{
  AuthEmailChanged(this.email);
  final String email;
}

class AuthPasswordChanged extends AuthEvent{
  AuthPasswordChanged(this.password);
  final String password;
}

class AuthLoginRequest extends AuthEvent{}

class AuthLogoutRequest extends AuthEvent{}
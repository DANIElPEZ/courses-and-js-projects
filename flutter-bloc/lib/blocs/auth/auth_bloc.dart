import 'package:bloc/bloc.dart';
import 'package:personal_finance/blocs/auth/auth_state.dart';
import 'package:personal_finance/blocs/auth/auth_event.dart';
import 'package:personal_finance/repositories/auth_repository.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState>{ //estiende de la clase de eventos y estado (valores a manejar)
  final AuthRepository authRepository;
  AuthBloc({required this.authRepository}):super(AuthState.initial()){//inicializa el estado
    on<AuthEmailChanged>((event, emit){ //escucha el evento con on<typeEvent>((el dato que llega, el emisor "la funcion"))
      emit(state.copyWith(email: event.email)); //se ejecuta con emit y actualiza el valor anterior
    });
    on<AuthPasswordChanged>((event, emit){
      emit(state.copyWith(password: event.password));
    });
    on<AuthLoginRequest>((event, emit) async{
      emit(state.copyWith(isSubmitting: true, errorMessage: null));
      try{
        await authRepository.signInWithEmailAndPassword(state.email, state.password);
        emit(state.copyWith(isSubmitting: false, isAuthenticated: true));
      }catch(e){
        emit(state.copyWith(isSubmitting: false, errorMessage: e.toString()));
      }
    });
    on<AuthLogoutRequest>((event, emit) async{
      try {
        await authRepository.signOut();
        emit(state.copyWith(isAuthenticated: false));
        emit(AuthState.initial());
      } catch (e) {
        emit(state.copyWith(isAuthenticated: false, errorMessage: e.toString()));
      }
    });
  }
}
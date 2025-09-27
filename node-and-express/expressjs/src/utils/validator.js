function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  return typeof name === 'string' && name.length >= 3;
}

function isUniqueNumericId(id, users, currentUserId = null) {
  return (typeof id === 'number' && !users.some(user => user.id === id  && user.id !== currentUserId));
}

function validateUser(user, users, currentUserId = null) {
  const { name, email, id } = user;
  if (!isValidName(name)) {
    return {
      isValid: false,
      error: 'El nombre debe tener al menos 3 caracteres.'
    };
  }
  if (!isValidEmail(email)) {
    return { isValid: false, error: 'El correo electrónico no es válido.' };
  }
  if (!isUniqueNumericId(id, users, currentUserId)) {
    return { isValid: false, error: 'El ID debe ser numérico y único.' };
  }
  return { isValid: true };
}

export {
     isValidEmail,
     isValidName,
     isUniqueNumericId,
     validateUser
};
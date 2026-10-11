// Textos legales mostrados dentro de la app.
// ⚠️ PLANTILLA: reemplaza los campos [ENTRE CORCHETES] con tus datos reales y
// pide a un abogado que los revise antes de publicar en las tiendas.

export const LEGAL_META = {
  appName: 'FinEd',
  company: '[NOMBRE DE LA EMPRESA O RESPONSABLE]',
  contactEmail: '[CORREO_DE_CONTACTO]',
  country: 'Chile',
  effectiveDate: '23 de junio de 2026',
};

export const PRIVACY_POLICY = `POLÍTICA DE PRIVACIDAD — ${LEGAL_META.appName}
Última actualización: ${LEGAL_META.effectiveDate}

1. Responsable del tratamiento
${LEGAL_META.company} es responsable del tratamiento de tus datos personales en la aplicación ${LEGAL_META.appName}. Para cualquier consulta sobre privacidad, escríbenos a ${LEGAL_META.contactEmail}.

2. Qué datos recopilamos
• Datos de cuenta: nombre y correo electrónico que entregas al registrarte.
• Datos de uso de la app: tu nivel inicial, progreso en módulos, quizzes y logros.
• Datos técnicos mínimos necesarios para mantener tu sesión iniciada.
No recopilamos datos de tarjetas ni información financiera real de tus cuentas bancarias. La app es educativa.

3. Para qué usamos tus datos
• Crear y administrar tu cuenta y mantener tu sesión.
• Guardar y mostrar tu progreso de aprendizaje.
• Enviarte correos imprescindibles del servicio (verificación de cuenta y recuperación de contraseña).
• Mejorar la app de forma agregada y anónima.
No vendemos tus datos personales a terceros ni los usamos para publicidad de terceros.

4. Base legal
Tratamos tus datos sobre la base de tu consentimiento (que otorgas al registrarte) y de la necesidad de ejecutar el servicio que solicitas. Puedes retirar tu consentimiento en cualquier momento eliminando tu cuenta.

5. Proveedores que nos ayudan
Usamos a Supabase como proveedor de autenticación y base de datos para almacenar tu cuenta de forma segura. Tus datos pueden alojarse en servidores fuera de ${LEGAL_META.country}; aplicamos medidas para protegerlos conforme a la normativa vigente.

6. Conservación
Conservamos tus datos mientras tu cuenta esté activa. Si eliminas tu cuenta, borramos tus datos personales asociados, salvo lo que debamos conservar por obligación legal.

7. Tus derechos
De acuerdo con la Ley N° 19.628 y la Ley N° 21.719 de Protección de Datos Personales de ${LEGAL_META.country} (y el RGPD/GDPR si te encuentras en la Unión Europea), tienes derecho a:
• Acceder a tus datos (función "Exportar mis datos" dentro de la app).
• Rectificar datos inexactos.
• Eliminar tu cuenta y tus datos (función "Eliminar mi cuenta" dentro de la app).
• Oponerte o limitar ciertos tratamientos.
• Portar tus datos.
Para ejercer cualquier derecho adicional, escríbenos a ${LEGAL_META.contactEmail}.

8. Seguridad
Aplicamos medidas técnicas y organizativas razonables: contraseñas cifradas, conexión segura y control de acceso a los datos. Ningún sistema es 100% infalible, pero trabajamos para protegerte.

9. Menores de edad
La app está pensada para mayores de edad o para menores con autorización de su apoderado. Si eres menor, usa la app con el consentimiento de quien te cuida.

10. Cambios
Podemos actualizar esta política. Te avisaremos dentro de la app cuando haya cambios relevantes y, si corresponde, pediremos tu consentimiento nuevamente.

Contacto: ${LEGAL_META.contactEmail}`;

export const TERMS = `TÉRMINOS Y CONDICIONES — ${LEGAL_META.appName}
Última actualización: ${LEGAL_META.effectiveDate}

1. Aceptación
Al crear una cuenta y usar ${LEGAL_META.appName}, aceptas estos Términos y la Política de Privacidad. Si no estás de acuerdo, por favor no uses la app.

2. Qué es la app
${LEGAL_META.appName} es una aplicación de educación financiera. Su contenido tiene fines exclusivamente informativos y educativos.

3. No es asesoría financiera
La información, ejemplos, simuladores y quizzes NO constituyen asesoría financiera, legal ni tributaria personalizada. Antes de tomar decisiones con tu dinero, evalúa tu situación particular y, si lo necesitas, consulta a un profesional. ${LEGAL_META.company} no se responsabiliza por decisiones que tomes basándote en el contenido de la app.

4. Tu cuenta
Eres responsable de mantener la confidencialidad de tu contraseña y de la actividad de tu cuenta. Debes entregar información veraz al registrarte.

5. Uso permitido
Te comprometes a no usar la app con fines ilícitos, a no intentar vulnerar su seguridad ni a copiar o redistribuir su contenido sin autorización.

6. Propiedad intelectual
El contenido, marca y diseño de ${LEGAL_META.appName} pertenecen a ${LEGAL_META.company} o a sus licenciantes, y están protegidos por la ley.

7. Disponibilidad
Hacemos lo posible por mantener la app disponible y al día, pero no garantizamos que esté libre de errores o interrupciones. Podemos modificar o discontinuar funciones.

8. Limitación de responsabilidad
En la medida que la ley lo permita, ${LEGAL_META.company} no será responsable por daños indirectos derivados del uso de la app.

9. Terminación
Puedes eliminar tu cuenta cuando quieras desde la app. Podemos suspender cuentas que incumplan estos Términos.

10. Ley aplicable
Estos Términos se rigen por las leyes de ${LEGAL_META.country}.

Contacto: ${LEGAL_META.contactEmail}`;

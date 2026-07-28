# Seguridad de aplicaciones

Política transversal obligatoria para aplicaciones YiQi completas. Complementa las
guías específicas de integración, login, errores, dependencias y deploy; si existe
una contradicción, prevalece el control más restrictivo.

## Estándares de referencia

- [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/tree/v5.0.0_release) es el estándar principal de verificación.
- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) complementa los riesgos específicos de APIs.
- [NIST SSDF 1.1 (SP 800-218)](https://csrc.nist.gov/pubs/sp/800/218/final) guía el ciclo de desarrollo seguro y la cadena de suministro.
- [MITRE CWE Top 25](https://cwe.mitre.org/top25/) prioriza clases de debilidades frecuentes y de alto impacto.

Las referencias son el punto de partida, no un reemplazo de threat modeling,
revisión humana ni pruebas ofensivas según el riesgo de la aplicación.

## Formato de controles

Cada control usa campos estables para que una persona, un agente o un homologador
pueda evaluarlo sin convertir texto libre en reglas implícitas:

- `id`: identificador inmutable `SEC-APP-NNN`.
- `severidad`: `critica`, `alta` o `media`; determina el gate de gobernanza.
- `alcance`: componente donde se debe aplicar y obtener evidencia.
- `obligatoria`: todos los controles de esta política tienen valor `true`.
- `automatizable`: `si`, `parcial` o `no`; nunca implica que la revisión humana sea opcional.
- `evidencia`: artefactos mínimos esperados para homologar.
- `remediacion`: corrección mínima cuando el control no se cumple.
- `referencia`: estándares o categorías que fundamentan el control.

## Controles obligatorios

### SEC-APP-001

```yaml
id: SEC-APP-001
titulo: Autorización por operación y recurso
severidad: critica
alcance: servidor
obligatoria: true
automatizable: parcial
evidencia:
  - middleware o policy aplicada en cada operación protegida
  - pruebas negativas entre usuarios, roles, tenants y recursos
remediacion: Aplicar autorización en servidor por operación y objeto; no depender de botones o rutas ocultas en frontend.
referencia: OWASP ASVS 5.0 Authorization / OWASP API1 y API5:2023 / CWE-862 y CWE-863
```

### SEC-APP-002

```yaml
id: SEC-APP-002
titulo: Prevención de ejecución e inyección inseguras
severidad: critica
alcance: servidor, parsers y acceso a datos
obligatoria: true
automatizable: parcial
evidencia:
  - consultas parametrizadas y APIs seguras sin evaluación dinámica
  - pruebas de abuso para deserialización, command injection, SQL/NoSQL injection, XXE y SSRF
remediacion: Eliminar deserialización insegura y ejecución dinámica; parametrizar operaciones y restringir parsers, protocolos y destinos.
referencia: OWASP ASVS 5.0 Encoding and Sanitization / CWE-78, CWE-89, CWE-94, CWE-502, CWE-611 y CWE-918
```

### SEC-APP-003

```yaml
id: SEC-APP-003
titulo: Credenciales y contraseñas seguras
severidad: critica
alcance: aplicación, configuración y persistencia
obligatoria: true
automatizable: parcial
evidencia:
  - detección de secretos sin hallazgos vigentes
  - configuración sin credenciales predeterminadas y almacenamiento de contraseñas con Argon2id o bcrypt
remediacion: Retirar y rotar secretos expuestos, eliminar credenciales predeterminadas y migrar hashes de contraseñas a Argon2id o bcrypt con parámetros vigentes.
referencia: OWASP ASVS 5.0 Authentication and Cryptography / CWE-256 y CWE-798
```

### SEC-APP-004

```yaml
id: SEC-APP-004
titulo: Validación allowlist de entradas y respuestas externas
severidad: alta
alcance: servidor e integraciones
obligatoria: true
automatizable: parcial
evidencia:
  - esquemas allowlist aplicados antes de procesar datos
  - pruebas con campos faltantes, adicionales, tipos inválidos y payloads externos malformados
remediacion: Validar y normalizar en el servidor toda entrada y respuesta externa mediante esquemas cerrados.
referencia: OWASP ASVS 5.0 Validation and Business Logic / OWASP API3 y API10:2023 / CWE-20
```

### SEC-APP-005

```yaml
id: SEC-APP-005
titulo: Límites de consumo de recursos
severidad: alta
alcance: API, workers y consultas
obligatoria: true
automatizable: parcial
evidencia:
  - límites configurados para body, uploads, paginación, GraphQL, concurrencia, tiempo y consumo por usuario
  - pruebas de rechazo y cancelación al superar cada límite aplicable
remediacion: Definir límites finitos por operación y usuario, rechazar temprano y cancelar trabajo que exceda el presupuesto.
referencia: OWASP ASVS 5.0 Web Frontend Security and API / OWASP API4:2023 / CWE-400
```

### SEC-APP-006

```yaml
id: SEC-APP-006
titulo: Protección de flujos sensibles y contra replay
severidad: alta
alcance: autenticación, recuperación, webhooks y operaciones sensibles
obligatoria: true
automatizable: parcial
evidencia:
  - rate limiting y señales antifraude por identidad, origen y operación
  - nonces, timestamps o claves de idempotencia con pruebas de replay
remediacion: Aplicar límites adaptativos, antifraude y verificación criptográfica o de unicidad antes de ejecutar el flujo.
referencia: OWASP ASVS 5.0 Authentication and Business Logic / OWASP API2 y API6:2023
```

### SEC-APP-007

```yaml
id: SEC-APP-007
titulo: Sesiones web seguras
severidad: alta
alcance: servidor y navegador
obligatoria: true
automatizable: parcial
evidencia:
  - cookies HttpOnly, Secure y SameSite con protección CSRF
  - pruebas de rotación al autenticar y revocación al cerrar sesión
remediacion: Migrar la sesión a cookies seguras, agregar defensa CSRF, rotar el identificador al autenticar y revocarlo al cerrar sesión.
referencia: OWASP ASVS 5.0 Session Management / CWE-352 y CWE-384
```

### SEC-APP-008

```yaml
id: SEC-APP-008
titulo: OAuth y OIDC seguros
severidad: alta
alcance: cliente OAuth/OIDC y servidor de callbacks
obligatoria: true
automatizable: parcial
evidencia:
  - PKCE S256, state y nonce validados por transacción
  - redirect URI registrada y comparada de forma exacta, sin comodines
remediacion: Exigir PKCE S256, state y nonce de un solo uso y registrar redirects exactos.
referencia: OWASP ASVS 5.0 OAuth and OIDC
```

### SEC-APP-009

```yaml
id: SEC-APP-009
titulo: MFA resistente a phishing para privilegios
severidad: alta
alcance: administradores y operaciones privilegiadas
obligatoria: true
automatizable: parcial
evidencia:
  - política de MFA resistente a phishing aplicada a cuentas privilegiadas
  - prueba de acceso y recuperación sin bypass por factor débil
remediacion: Exigir WebAuthn, passkeys o factor criptográfico equivalente para administradores y operaciones privilegiadas.
referencia: OWASP ASVS 5.0 Authentication / NIST SP 800-63B
```

### SEC-APP-010

```yaml
id: SEC-APP-010
titulo: Carga segura de archivos
severidad: alta
alcance: uploads y almacenamiento
obligatoria: true
automatizable: parcial
evidencia:
  - límites y validación por contenido real con nombres generados
  - almacenamiento fuera del webroot y análisis antimalware cuando corresponda
remediacion: Limitar tamaño y tipo real, generar nombres, aislar el almacenamiento y analizar contenido según riesgo.
referencia: OWASP ASVS 5.0 File Handling / CWE-434
```

### SEC-APP-011

```yaml
id: SEC-APP-011
titulo: Consumo seguro de APIs externas
severidad: alta
alcance: clientes HTTP del servidor
obligatoria: true
automatizable: parcial
evidencia:
  - HTTPS, timeout y tamaño máximo configurados
  - redirects deshabilitados o controlados y destinos en allowlist
remediacion: Centralizar el cliente HTTP con transporte verificado, presupuestos finitos y allowlist de hosts y protocolos.
referencia: OWASP ASVS 5.0 Communication / OWASP API7 y API10:2023 / CWE-918
```

### SEC-APP-012

```yaml
id: SEC-APP-012
titulo: Servicios internos y bases de datos protegidos
severidad: alta
alcance: datos, red e infraestructura
obligatoria: true
automatizable: parcial
evidencia:
  - TLS verificado entre servicios y hacia bases de datos
  - cuentas de mínimo privilegio y ausencia de exposición pública
remediacion: Habilitar TLS, segmentar la red, retirar endpoints públicos y reducir permisos a las operaciones necesarias.
referencia: OWASP ASVS 5.0 Communication and Configuration / NIST SSDF PW.9
```

### SEC-APP-013

```yaml
id: SEC-APP-013
titulo: Cabeceras de seguridad del navegador
severidad: media
alcance: respuestas web
obligatoria: true
automatizable: si
evidencia:
  - CSP restrictiva con frame-ancestors
  - HSTS, X-Content-Type-Options nosniff, Referrer-Policy y Permissions-Policy
remediacion: Configurar las cabeceras globalmente y reducir excepciones de CSP a orígenes y recursos necesarios.
referencia: OWASP ASVS 5.0 Web Frontend Security / CWE-693
```

### SEC-APP-014

```yaml
id: SEC-APP-014
titulo: Caché segura de respuestas
severidad: media
alcance: aplicación, CDN y proxies
obligatoria: true
automatizable: parcial
evidencia:
  - Cache-Control no-store en respuestas sensibles
  - claves de caché compartida separadas por identidad y permisos
remediacion: Deshabilitar caché de datos sensibles y variar o particionar cachés compartidas por el contexto de autorización.
referencia: OWASP ASVS 5.0 Web Frontend Security and Data Protection
```

### SEC-APP-015

```yaml
id: SEC-APP-015
titulo: WebSockets seguros
severidad: media
alcance: servidor WebSocket
obligatoria: true
automatizable: parcial
evidencia:
  - autenticación y validación de Origin durante el handshake
  - autorización por mensaje y límites de frecuencia y tamaño
remediacion: Autenticar la conexión, validar Origin, autorizar cada acción y limitar mensajes y conexiones.
referencia: OWASP ASVS 5.0 Web Frontend Security and API
```

### SEC-APP-016

```yaml
id: SEC-APP-016
titulo: Auditoría estructurada sin datos sensibles
severidad: media
alcance: observabilidad y respuesta a incidentes
obligatoria: true
automatizable: parcial
evidencia:
  - eventos estructurados de login, permisos y acciones administrativas con correlación
  - pruebas o filtros que excluyen tokens, contraseñas y PII
remediacion: Definir un esquema de auditoría, minimizar datos y redactar secretos y PII antes de emitir logs.
referencia: OWASP ASVS 5.0 Security Logging and Error Handling / CWE-532
```

### SEC-APP-017

```yaml
id: SEC-APP-017
titulo: Contenedores con mínimo privilegio
severidad: media
alcance: imagen y runtime de contenedores
obligatoria: true
automatizable: parcial
evidencia:
  - usuario no root e imagen mínima con vulnerabilidades evaluadas
  - filesystem de solo lectura cuando sea posible y secretos inyectados fuera de la imagen
remediacion: Usar una imagen mínima, ejecutar con UID no root, retirar secretos y habilitar filesystem de solo lectura cuando el runtime lo permita.
referencia: OWASP ASVS 5.0 Configuration / NIST SSDF PS.1 y PW.9
```

### SEC-APP-018

```yaml
id: SEC-APP-018
titulo: CI/CD endurecido
severidad: media
alcance: repositorio y pipeline
obligatoria: true
automatizable: parcial
evidencia:
  - permisos mínimos y acciones fijadas por versión inmutable o SHA
  - ausencia de descarga y ejecución directa de scripts remotos
remediacion: Reducir permisos del job, fijar dependencias del pipeline y reemplazar scripts remotos por artefactos verificados y versionados.
referencia: NIST SSDF PO.5, PS.1 y PS.2 / CWE-494
```

### SEC-APP-019

```yaml
id: SEC-APP-019
titulo: SBOM, provenance y firma de artefactos
severidad: media
alcance: release y cadena de suministro
obligatoria: true
automatizable: si
evidencia:
  - SBOM y provenance vinculados a cada release
  - firma y verificación de artefactos cuando el entorno lo permita
remediacion: Generar SBOM y attestations en CI, conservarlos con el release y habilitar firma en entornos compatibles.
referencia: NIST SSDF PS.2 y PS.3
```

### SEC-APP-020

```yaml
id: SEC-APP-020
titulo: Verificación continua de seguridad
severidad: alta
alcance: pull requests, releases y aplicación desplegada
obligatoria: true
automatizable: parcial
evidencia:
  - SAST, análisis de dependencias y detección de secretos ejecutados en cada PR
  - DAST y pruebas de penetración planificados y ejecutados según riesgo
remediacion: Incorporar los controles automáticos al gate del PR y definir pruebas dinámicas y ofensivas proporcionales al riesgo.
referencia: OWASP ASVS 5.0 / NIST SSDF PW.7, PW.8 y RV.1
```

## Gobernanza y gates

- Un hallazgo crítico abierto bloquea el deploy y no admite excepción mientras siga abierto.
- Un hallazgo alto debe resolverse antes del merge o contar con una excepción formal vigente.
- Toda excepción debe registrar control o hallazgo, responsable, justificación,
  mitigación compensatoria y fecha de vencimiento.
- Los hallazgos medios se priorizan por riesgo y deben tener responsable y plazo.
- Los falsos positivos deben documentar evidencia y alcance. Nunca se silencian
  globalmente una regla, un scanner o una categoría para resolver un caso puntual.
- Datos simulados, endpoints de debug y documentación interna deben quedar
  deshabilitados o inaccesibles en producción.
- El análisis automático complementa, pero no reemplaza, revisión humana, threat
  modeling ni pruebas ofensivas.
- Una excepción vencida equivale a un hallazgo abierto de su severidad original.

## Evidencia de cierre

El PR debe enlazar resultados reproducibles, no limitarse a marcar casillas. Como
mínimo debe incluir:

- controles `SEC-APP` aplicables y controles declarados no aplicables con motivo;
- resultados de SAST, dependencias y detección de secretos;
- pruebas negativas de autenticación y autorización cuando cambien permisos o datos;
- excepciones vigentes con todos los campos de gobernanza;
- riesgos residuales, responsable y próxima verificación.

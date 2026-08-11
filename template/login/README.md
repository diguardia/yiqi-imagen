# Login legacy / adaptador React

Este directorio ya no es la fuente de implementacion del login para aplicaciones React.

## React / Next.js

Usar directamente:

```tsx
import '@yiqi/ui/styles.css'
import { YiQiLogin } from '@yiqi/ui/authentication'

<YiQiLogin appName="Mi app" onSubmit={login} />
```

`yiqi-login-template.tsx` se conserva solo como adaptador de compatibilidad y delega en `YiQiLogin`. No debe volver a incorporar formulario, storage, loading, iconos o validaciones propias.

No copiar este archivo a proyectos nuevos. Importar el paquete.

## Archivos legacy

Los previews, CSS adaptador y assets historicos de esta carpeta pueden seguir usandose para comparar una migracion o mantener un consumidor antiguo. No definen el contrato React actual.

## HTML / no React

Si el runtime no puede consumir React, usar la capa legacy indicada en `../INDEX.md` y `../../styles.css`.

## Seguridad

El componente visual no reemplaza el flujo de autenticacion del proyecto. Ver `../../docs/yiqi-login.md` para token, `GetLoginInformation`, persistencia y logout.

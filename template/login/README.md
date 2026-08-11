# Login legacy / adaptador React

Este directorio ya no es la fuente de implementacion del login para aplicaciones React.

## React / Next.js

Usar directamente:

```tsx
import '@yiqi/ui/styles.css'
import { YiQiLogin } from '@yiqi/ui/authentication'

<YiQiLogin appName="Mi app" onSubmit={login} />
```

`yiqi-login-template.tsx` se conserva como adaptador de compatibilidad y delega en `YiQiLogin`.

El adaptador preserva los defaults observables del template React anterior, incluyendo copy, mensajes accesibles y logo animado. No vuelve a implementar formulario, storage, loading ni validaciones.

Importante: el adaptador React requiere `@yiqi/ui/styles.css`. El `styles.css` legacy de la raiz sigue siendo el contrato de HTML/no React y no contiene las clases `yiqi-*` del paquete React.

No copiar este archivo a proyectos nuevos. Importar el paquete.

## Archivos legacy

Los previews, CSS adaptador y assets historicos de esta carpeta pueden seguir usandose para comparar una migracion o mantener un consumidor antiguo. No definen el contrato React actual.

## HTML / no React

Si el runtime no puede consumir React, usar la capa legacy indicada en `../INDEX.md` y `../../styles.css`.

## Seguridad

El componente visual no reemplaza el flujo de autenticacion del proyecto. Ver `../../docs/yiqi-login.md` para token, `GetLoginInformation`, persistencia y logout.

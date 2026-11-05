# En desarrollo

Página para los subdominios de apps de YiQi que todavía no están disponibles
(por ejemplo contable.yiqi.com.ar o stocktalle.yiqi.com.ar).

- Copiar `index.html` al proyecto de la app y servirlo como página por defecto
  mientras la app no esté lista, o como respuesta 404.
- El título toma el nombre de la app del subdominio (mapa `APPS` del script) o
  del parámetro `?app=Nombre`. Sin nombre, dice "Esta app está en desarrollo".
- Carga el `styles.css` publicado del DS; no copiar CSS.
- Los nombres tienen que coincidir con `components/apps-data.js` de www.yiqi.

Vista previa: https://diguardia.github.io/yiqi-imagen/template/en-desarrollo/?app=YiQi%20Contable

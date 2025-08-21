# Historia de Usuario - Visualización de Servicios

## Título  
Como **usuario registrado** quiero **ver la lista de servicios y su detalle** para **agendar una cita manualmente o con IA**.  

---

## Criterios de Aceptación  

```gherkin
Escenario: Acceso a servicios
  Dado que inicio sesión con credenciales válidas
  Cuando soy redirigido a /servicios
  Entonces veo la lista de servicios en cards

Escenario: Ver detalle
  Dado que estoy en /servicios
  Cuando selecciono un servicio
  Entonces veo su información completa y tres botones: Cancelar, Agendar con IA, Agendar manualmente


## Notas Técnicas  

- **Rutas:**  
  - `/login` → redirige a `/servicios` al validar credenciales.  
  - `/servicios` → muestra lista de servicios en formato cards.  
  - `/servicio/:id` → muestra detalle del servicio con botones de acción.  

- **Componentes:**  
  - `Login` (validación y redirección).  
  - `Services` (lista de servicios en cards con datos simulados).  
  - `ServiceDetail` (información completa + botones).  

- **Dependencias:**  
  - `react-router-dom` para la navegación.  
  - `Firebase Auth` (o mock de autenticación para pruebas).  
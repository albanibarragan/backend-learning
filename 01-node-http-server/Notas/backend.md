## Backend
Es el software que recibe peticiones, procesa información y devuelve resultados.

Un backend puede encargarse de muchas cosas:

                    BACKEND
                       │
       ┌───────────────┼────────────────┐
       ↓               ↓                ↓
    Lógica          Base de datos     Autenticación
       │               │                │
    calcular        guardar usuarios   login
    precios         guardar pedidos    permisos
    pedidos         productos          roles
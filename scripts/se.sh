if [ $# -ne 2 ]; then
    echo "Uso: $0 <Nombre-Modulo> <Nombre-Servicio>"
fi

ng g s features/$1/services/$2

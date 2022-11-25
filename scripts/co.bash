if [ $# -ne 2 ]; then
    echo "Uso: $0 <Nombre-Modulo> <Nombre-Componente>"
fi

ng g c features/$1/components/$2

if [ $# -ne 1 ]; then
    echo "Uso: $0 <Nombre-Modulo>"
fi

ng g m features/$1

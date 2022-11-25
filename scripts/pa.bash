if [ $# -ne 2 ]; then
    echo "Uso: $0 <Nombre-Modulo> <Nombre-Pagina>"
fi

ng g c features/$1/pages/$2

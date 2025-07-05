from flask import Flask, render_template, request, redirect
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/por-que-reciclar')
def por_que():
    return render_template('por_que.html')

@app.route('/como-reciclar')
def como():
    return render_template('como.html')

@app.route('/recursos')
def recursos():
    return render_template('recursos.html')

@app.route('/participa', methods=['GET', 'POST'])
def participa():
    if request.method == 'POST':
        nombre = request.form['nombre']
        comentario = request.form['comentario']
        with open('comentarios.csv', 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([nombre, comentario])
        return redirect('/participa')
    return render_template('participa.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
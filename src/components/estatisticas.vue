<template>
    <h3>📊 VENDAS DO MÊS</h3>

    <div class="stats">
      <div class="stat">
        Faturamento
        <b>{{ moeda(totalVendas) }}</b>
      </div>

      <div class="stat">
        Unidades
        <b>{{ unidadesVendidas }}</b>
      </div>

      <div class="stat">
        Pedidos
        <b>{{ vendas.length }}</b>
      </div>

      <div class="stat">
        Top categoria
        <b class="top-category">{{ categoriaMaisVendida }}</b>
      </div>
    </div>

    <h3>VENDAS POR CATEGORIA</h3>

    <div class="bars">
      <div
        v-for="item in vendasPorCategoria"
        :key="item.categoria"
        class="bar"
      >
        <span>{{ item.categoria }}</span>

        <i
          :style="{
            width: `${item.valor / maiorVenda * 55}%`
          }"
        ></i>

        <b>{{ moeda(item.valor) }}</b>
      </div>
    </div>

    <br>

    <button class="btn red" @click="abrirFormulario()">
      + CRIAR PRODUTO
    </button>
  </template>

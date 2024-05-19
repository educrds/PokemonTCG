
# Criação de baralhos com cartas de Pokémon

## Instalação
1.  **Clone o repositório:**

        `git clone https://github.com/educrds/teste-stefanini.git`
        
3.  **Instale as dependências:**
    
       Execute o seguinte comando para instalar as dependências do projeto:
       
        `npm install` 
        
4.  **Execute o servidor de desenvolvimento:**
    
    Após a instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento:   
           
        `ng serve` 

## Resumo

O projeto proposto consiste em desenvolver um aplicativo web que consome a API https://pokemontcg.io para criar e gerenciar baralhos a partir das cartas de Pokémon disponíveis. O CRUD de baralhos permitirá aos usuários realizar operações básicas, como **criar, visualizar, atualizar e excluir** baralhos, utilizando as cartas de Pokémon como base.

O aplicativo oferece as seguintes funcionalidades:

-   **Listagem de Baralhos:**
    
    -   Os usuários podem visualizar uma lista de todos os baralhos criados.
    -   Cada item da lista exibe informações como título, quantidade de cartas Pokémon e Trainer, e número de tipos únicos de cartas no baralho.
-   **Detalhes/Edição do Baralho:**
	- Os usuários podem editar o nome de um baralho existente.
    -   Os usuários podem visualizar todos os detalhes de um baralho específico, incluindo seu nome e todas as cartas que ele contém.
    -   Opções para adicionar, remover ou editar cartas no baralho estão disponíveis.
    -   Os usuários podem retornar à lista de baralhos a partir desta visualização.
-   **Criação de Baralho:**
    
    -   Os usuários podem criar um novo baralho, fornecendo um nome para o mesmo.
    -   Após a criação bem-sucedida, são redirecionados para os detalhes do novo baralho.
        
-   **Exclusão de Baralho:**
    
    -   Os usuários podem excluir um baralho existente.
    -   Após a exclusão bem-sucedida, são redirecionados de volta à lista de baralhos.


## Arquitetura
O projeto adotou uma arquitetura modular, onde o módulo compartilhado, denominado `SharedModule`, desempenhou um papel central ao abrigar os chamados "dumb components" ou componentes burros. Estes componentes, caracterizados por não possuírem lógica de negócios, foram reutilizados em duas páginas distintas: `HomeComponent` e `NovoBaralhoComponent`.

A `HomeComponent` foi responsável por manter e exibir os dados salvos pelo usuário, enquanto o `NovoBaralhoComponent` focou na criação e edição de novos dados. Essa divisão de responsabilidades entre as páginas contribui para uma estrutura modular e coesa, facilitando a manutenção e o desenvolvimento contínuo do projeto.

Optar por um módulo compartilhado e o uso de componentes autônomos ofereceu diversas vantagens em um projeto de pequena escala. Além de promover a reutilização de código e a consistência visual, essa abordagem simplifica a manutenção, favorece a escalabilidade e a legibilidade do código-fonte. Essa escolha estrutural, embora simples, reflete uma abordagem eficiente e organizada na concepção do projeto.

## Tecnologias utilizadas
1.  **Tailwind CSS**: Framework de CSS utilitário para estilizar rapidamente elementos HTML.
2.  **Angular**.
3.  **VSCode**: IDE utilizada.
4.  **SweetAlert**: Biblioteca JavaScript para criar caixas de diálogo personalizadas.
5.  **Infragistics UI**: Biblioteca de componentes de interface do usuário para desenvolvimento web e móvel.
6.  **RxJS**: Biblioteca de programação reativa para manipular fluxos de dados assíncronos em JavaScript.

## Dificuldades
Apesar da funcionalidade robusta da biblioteca Infragistics UI, enfrentei desafios devido à documentação extensa e não tão intuitiva quanto outras bibliotecas do mercado. Além disso, sua renderização mais lenta pode ter impactado no desempenho do projeto. No entanto, com persistência e ajustes adequados, consegui superar essas dificuldades e implementar com sucesso os recursos desejados, sem que esses obstáculos se tornassem impeditivos para o progresso do projeto.
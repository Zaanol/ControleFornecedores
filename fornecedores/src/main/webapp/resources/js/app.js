//Declaração do módulo app
var app = angular.module('app', []);

//Configuração para a prevenção de rejeições
app.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

//Criação do controller FornecedorController
app.controller('FornecedorController', ['$scope', 'FornecedorService',
	//Função para que ao carregar a página lista os fornecedores
    function($scope, FornecedorService) {
		//Configurações dos botões
        $scope.atualizar = false;
        $scope.cadastrar = true;
        $scope.cancelAtu = false;
        FornecedorService.getFornecedores()
            .then(function success(response) {
                    $scope.fornecedores = response.data;
                },
                function error(response) {
                    $scope.message = '';
                    alerta("Erro ao pesquisar fornecedores!", "danger");
                });
        $scope.getFornecedores = function() {
            FornecedorService.getFornecedores()
                .then(function success(response) {
                        $scope.fornecedores = response.data;
                    },
                    function error(response) {
                        alerta("Erro ao pesquisar fornecedores!", "danger");
                    });
        }
        
        //Função não utilizada, porém é para capturar o fornecedor pelo ID
        $scope.getFornecedor = function() {
        	//Recebe o ID do input do formulário
            var id = $scope.fornecedor.id;
            //Chama a função getFornecedor passando o ID como parâmetro
            FornecedorService.getFornecedor($scope.fornecedor.id)
            	//Se a operação for realizada com sucesso, seta o conteúdo do formulário com as informações capturadas
                .then(function success(response) {
                        $scope.fornecedor = response.data;
                        $scope.fornecedor.id = id;
                    },
                    function error(response) {
                        $scope.message = '';
                        if (response.status === 404) {
                            alerta("Fornecedor não encontrado", "danger");
                        } else {
                            alerta("Erro ao pegar fornecedor!", "danger");
                        }
                    });
        };

        //Função para adicionaru m fornecedor
        $scope.addFornecedor = function() {
        	//Validação de preenchimento dos campos
            if ($scope.fornecedor != null && $scope.fornecedor.name && $scope.fornecedor.email && $scope.fornecedor.cnpj) {
                FornecedorService.addFornecedor($scope.fornecedor.name, $scope.fornecedor.email, $scope.fornecedor.comment, $scope.fornecedor.cnpj)
                    .then(function error(response) {
                            alerta("Por favor insira os dados corretamente", "danger");
                        },
                        function success(response) {
                            alerta("Fornecedor adicionado!", "success");
                            FornecedorService.getFornecedores()
                                .then(function success(response) {
                                        $scope.fornecedores = response.data;
                                    },
                                    function error(response) {
                                        alerta("Erro ao pesquisar fornecedores!", "danger");
                                    });
                        });
            } else {
                alerta("Por favor insira os dados corretamente", "danger");
            }
        }

        //Função para atualização do fornecedor
        $scope.updateFornecedor = function() {
        	//Validação do preenchimento dos campos
            if ($scope.fornecedor != null && $scope.fornecedor.id && $scope.fornecedor.name && $scope.fornecedor.email && $scope.fornecedor.cnpj) {
                FornecedorService.updateFornecedor($scope.fornecedor.id, $scope.fornecedor.name, $scope.fornecedor.email, $scope.fornecedor.comment, $scope.fornecedor.cnpj)
                    .then(function error(response) {
                            alerta("Erro ao atualizar fornecedor!", "danger");
                        },
                        function success(response) {
                            alerta("Fornecedor atualizado!", "success");
                            //Função para atualizar a lista de fornecedores
                            FornecedorService.getFornecedores()
                                .then(function success(response) {
                                        $scope.fornecedores = response.data;
                                    },
                                    function error(response) {
                                        alerta("Erro ao pesquisar fornecedores!", "danger");
                                    });
                        });
            } else {
                alerta("Por favor insira os dados corretamente", "danger");
            }
        }

        //Função específica para pegar os dados da tabela e inserir no formulário para futura edição
        $scope.UpdateFornecedorFormulario = function(fornecedor) {
        	//Manipulação dos botões
            $scope.atualizar = true;
            $scope.cadastrar = false;
            $scope.cancelAtu = true;
            $scope.fornecedor = fornecedor;
            $scope.fornecedor.id = fornecedor.id;
        }

        //Função para realizar o cancelamento da atualização do fornecedor
        $scope.cancelarUpdate = function() {
        	//Manipulação dos botões
            $scope.atualizar = false;
            $scope.cadastrar = true;
            $scope.cancelAtu = false;
            $scope.fornecedor = null;
            //Função para atualização da tabela
            FornecedorService.getFornecedores()
                .then(function success(response) {
                        $scope.fornecedores = response.data;
                    },
                    function error(response) {
                        alerta("Erro ao pesquisar fornecedores!", "danger");
                    });
        }

        //Função responsável pela exclusão de um fornecedor
        $scope.deleteFornecedor = function(fornecedor) {
            FornecedorService.deleteFornecedor(fornecedor.id)
                .then(function error(response) {
                        alerta("Erro ao remover fornecedor!", "danger");
                    },
                    function success(response) {
                        alerta("Fornecedor removido!", "success");
                        FornecedorService.getFornecedores()
                            .then(function success(response) {
                                    $scope.fornecedores = response.data;
                                },
                                function error(response) {
                                    alerta("Erro ao pesquisar fornecedores!", "danger");
                                });
                    });
        }
    }
]);

//Declaração do serviço que vai ser responsável pela comunicação REST
app.service('FornecedorService', ['$http', function($http) {
	//Operação de GET para recuperar informação de um fornecedor
    this.getFornecedor = function getFornecedor(id) {
        return $http({
            method: 'GET',
          //Rota criada no backend
            url: 'rotas/listar/' + id
        });
    }
    
    //Operação de POST para adicionar um fornecedor
    this.addFornecedor = function addFornecedor(name, email, comment, cnpj) {
        return $http({
            method: 'POST',
            //Rota criada no backend
            url: 'rotas/cadastrar',
            data: {
                name: name,
                email: email,
                comment: comment,
                cnpj: cnpj
            }
        });
    }

    //Operação para atualização do fornecedor
    this.updateFornecedor = function updateFornecedor(id, name, email, comment, cnpj) {
        return $http({
            method: 'PUT',
            //Rota criada no backend
            url: 'rotas/alterar',
            data: {
                id: parseInt(id),
                name: name,
                email: email,
                comment: comment,
                cnpj: cnpj
            }
        });
    }
    
    //Operação para remoção do fornecedor
    this.deleteFornecedor = function deleteFornecedor(id) {
        return $http({
            method: 'DELETE',
            //Rota criada no backend
            url: 'rotas/excluir/' + id
        })
    }
    
    //Operação para pegar a lista de fornecedores
    this.getFornecedores = function getFornecedores() {
        return $http({
            method: 'GET',
            //Rota criada no backend
            url: 'rotas/listar'
        });
    }
}]);

//Função para aparecer o alerta de erro / sucesso
function alerta(info, tipo) {
    let HTML = '<br><div class="alert alert-' + tipo + ' fade show" role="alert">';
    HTML += '<center><strong>' + info + '</center></strong>';
    HTML += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    HTML += '<span aria-hidden="true">&times;</span></button></div><br>';
    document.getElementById("resultado").innerHTML = HTML;
}
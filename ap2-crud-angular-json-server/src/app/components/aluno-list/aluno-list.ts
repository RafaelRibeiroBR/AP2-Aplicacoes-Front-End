import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Aluno } from '../../model/alunos';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  templateUrl: './aluno-list.html',
  styleUrl: './aluno-list.css',
})
export class AlunoList {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly alunoService = inject(AlunoService);

  alunos: Aluno[] = [];
  carregando = false;

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.carregando = true;

    this.alunoService.listar().subscribe({
      next: (dados) => {
        this.alunos = dados;
        this.carregando = false;

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar alunos:', erro);
        this.carregando = false;
      }
    });
  }

 editar(aluno: Aluno): void {

  if (!aluno.id) {
    return;
  }

  const novoNome = prompt('Nome:', aluno.nome);

  if (novoNome === null) {
    return;
  }

  const novaIdade = prompt(
    'Idade:',
    aluno.idade.toString()
  );

  if (novaIdade === null) {
    return;
  }

  const novoCurso = prompt(
    'Curso:',
    aluno.curso
  );

  if (novoCurso === null) {
    return;
  }

  const novoFormado = confirm(
    'Aluno está formado?'
  );

  const alunoAtualizado: Aluno = {
    ...aluno,
    nome: novoNome,
    idade: String(novaIdade),
    curso: novoCurso,
    formado: novoFormado
  };

  this.alunoService.atualizar(
    aluno.id,
    alunoAtualizado
  ).subscribe({

    next: () => {
      this.carregarAlunos();
    },

    error: (erro) => {
      console.error(
        'Erro ao editar aluno:',
        erro
      );
    }

  });

}

  excluir(aluno: Aluno): void {
    if (!aluno.id) {
      return;
    }

    const confirmou = confirm(`Deseja excluir o aluno "${aluno.nome}"?`);

    if (!confirmou) {
      return;
    }

    this.alunoService.excluir(aluno.id).subscribe({
      next: () => this.carregarAlunos(),
      error: (erro) => console.error('Erro ao excluir aluno:', erro)
    });
  }
}

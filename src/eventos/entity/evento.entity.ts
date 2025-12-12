import { CategoriaEntity } from "src/categoria/entity/categoria.entity";
import { RegistrarEventoEntity } from "src/register_event/entity/register.evento.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("evento")
export class EventoEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar", length:100, unique:false, nullable:false})
    nombre:string;
    @Column({type:"text", nullable:false})
    descripcion:string;
    @Column({type:"date", nullable:false})
    fecha:Date;
    @Column({type:"varchar", length:100, nullable:false})
    hora:string;
    @Column({type:"varchar", length:150, nullable:false})
    ubicacion:string;
    @Column({type:"varchar", length:100, nullable:false})
    organizador:string;
    @Column({type:"varchar", length:50, nullable:false})
    valor:string;
    @Column({type:"boolean", default:false})
    closed:boolean;
    @Column({type:"text", nullable:true})
    imagen:string;
    @Column({type:"varchar", length:100, nullable:true})
    capacidad:string;

    @ManyToOne(()=> UserEntity,(user)=>user.evento, { nullable:true, onDelete: "CASCADE" })
    user:UserEntity;

    @OneToMany(()=>RegistrarEventoEntity,(registro)=>registro.evento)
    registros:RegistrarEventoEntity[];

    @ManyToOne(()=>CategoriaEntity,(categoria)=>categoria.eventos)
    categoria:CategoriaEntity;
}
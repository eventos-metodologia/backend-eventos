import { RolEntity } from "src/rol/entity/rol.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    usuario: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    contrasena: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    nombre: string;

    @ManyToOne(() => RolEntity, (rol) => rol.users, { onDelete: "CASCADE", eager: true })
    rol: RolEntity; // Cambiado de 'number' a 'RolEntity'
}
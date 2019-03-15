﻿using MySql.Data.MySqlClient;
using Ocph.DAL.Provider.MySql;

using System;
using System.Data;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Ocph.DAL.ExpressionHandler
{
    public class UpdateTranslator : ExpressionVisitor
    {
        IProvierHelper IHelper;
        private IDbCommand command;
        public UpdateTranslator(ref IDbCommand cmd)
        {
            IHelper = new MySqlProviderHelper();
            this.command = cmd;
        }


        private StringBuilder sb = new StringBuilder();
        private object source;
        private string _updateQuery;
      

        public string UpdateQuery
        {
            get { return _updateQuery; }
            set { _updateQuery = value; }
        }


        internal string Translate(Expression fieldUpdate, object source)
        {
            EntityInfo entity = new EntityInfo(source.GetType());
            this.sb = new StringBuilder();
            this.source = source;
            sb.Append("Update ").Append(entity.TableName).Append(" Set ");
            this.Visit(fieldUpdate);
            var result = sb.ToString();
            _updateQuery = string.Format(result.Substring(0, result.Length - 2));
            return _updateQuery;
        }


        protected override Expression VisitMember(MemberExpression node)
        {
            Type type = node.Member.ReflectedType;
            EntityInfo entity = new EntityInfo(type);
            PropertyInfo p = entity.GetPropertyByPropertyName(node.Member.Name);
            var fieldName = entity.GetAttributDbColumn(p);
            sb.Append(fieldName).Append("=").Append("@" + fieldName).Append(", ");
            var parameter = IHelper.CreateParameter(fieldName, p, source);
            command.Parameters.Add(parameter);
            return base.VisitMember(node);
        }
    }
}
